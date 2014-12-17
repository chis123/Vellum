define([
    'vellum/form',
    'jquery',
    'underscore',
    'vellum/mugs',
    'vellum/parser',
    'vellum/tree',
    'vellum/util',
    'vellum/widgets',
    'vellum/core'
], function (
    form_,
    $,
    _,
    mugs,
    parser,
    Tree,
    util,
    widgets
) {
    var Repeat = mugs.baseMugTypes.normal.Repeat,
        // the order of the items in this list is important:
        // <setvalue> elements are evaluated in document order
        setvalueData = [
            {
                key: "ids",
                event: "xforms-ready",
                path: "",
                query: "join(' ', {})"
            }, {
                key: "count",
                event: "xforms-ready",
                path: "",
                query: "count-selected({}/@ids)"
            }, {
                key: "current_index",
                event: "jr-insert",
                path: "",
                query: "count({}/item)"
            }, {
                key: "index",
                event: "jr-insert",
                path: "/item",
                query: "int({}/@current_index)"
            }, {
                key: "id",
                event: "jr-insert",
                path: "/item",
                query: "selected-at({}/@ids,../@index)"
            }
        ],
        instanceRegexp = /^instance\(['"]([^'"]+)['"]\)/i,
        joinIdsRegexp = /^ *join\(['"] ['"], *(.*)\) *$/i,
        modelRepeatMugOptions = {
            typeName: 'Model Repeat',
            supportsDataNodeRole: true,
            dataNodeChildren: function ($node) {
                return $node.children("item").children();
            },
            dataChildFilter: function (children, mug) {
                return [new Tree.Node(children, {
                    getNodeID: function () { return "item"; },
                    p: {rawDataAttributes: {}},
                    options: {
                        getExtraDataAttributes: function (mug) {
                            return {id: "", index: "", "jr:template": ""};
                        }
                    }
                })];
            },
            controlChildFilter: function (children, mug) {
                var absPath = mug.form.getAbsolutePath(mug),
                    r_count = mug.p.repeat_count;
                children = Repeat.controlChildFilter(children, mug);
                children[0].getValue().options.writeCustomXML = function (xmlWriter, mug) {
                    if (r_count) {
                        xmlWriter.writeAttributeString("jr:count", String(r_count));
                        xmlWriter.writeAttributeString("jr:noAddRemove", "true()");
                    }
                    xmlWriter.writeAttributeString("nodeset", absPath + "/item");
                };
                return children;
            },
            getExtraDataAttributes: function (mug) {
                // HACK must happen before <setvalue> and "other" <instance> elements are written
                prepareForWrite(mug);
                return {
                    ids: "",
                    count: "",
                    current_index: "",
                    "vellum:role": "ModelRepeat"
                };
            },
            afterInsert: function (form, mug) {
                // TODO create hidden values for case properties, etc.
                //form.createQuestion(mug, 'into', "Hidden", true);
            },
            init: function (mug, form) {
                Repeat.init(mug, form);
                mug.p.repeat_count = "";
                mug.p.setvalues = {};
                mug.p.originalPath = null;
                mug.p.dataSource = {};
                mug.p.dataSourceChanged = false;
                mug.on("mug-property-change", function (event) {
                    if (event.property === "dataSource") {
                        event.mug.dataSourceChanged = true;
                        // TODO drop old instance (if no longer referenced)?
                    }
                });
            },
            spec: {
                repeat_count: {
                    visibility: "hidden"
                },
                dataSource: {
                    lstring: 'Data Source',
                    visibility: 'visible_if_present',
                    presence: 'optional',
                    // TODO data source selection widget
                    widget: widgets.droppableText
                }
            }
        };

    $.vellum.plugin("modeliteration", {}, {
        getMugTypes: function () {
            var types = this.__callOld(),
                Repeat = types.normal.Repeat;
            types.normal.ModelRepeat = util.extend(Repeat, modelRepeatMugOptions);
            return types;
        },
        updateControlNodeAdaptorMap: function (map) {
            this.__callOld();
            var getGroupAdaptor = map.group;
            map.group = function ($element, appearance, form, parentMug) {
                var adapt = getGroupAdaptor($element, appearance, form, parentMug);
                if (adapt.repeat) {
                    var repeat = adapt.repeat,
                        path = adapt.path,
                        mug;
                    if (/\/item$/.test(path)) {
                        mug = form.getMugByPath(path.substring(0, path.length - 5));
                        if (mug && mug.__className === "ModelRepeat") {
                            adapt = function (ignore, form) {
                                mug.p.repeat_count = repeat.popAttr('jr:count') || null;
                                mug.p.rawRepeatAttributes = parser.getAttributes(repeat);
                                return mug;
                            };
                            adapt.type = 'ModelRepeat';
                            adapt.path = path;
                            adapt.repeat = repeat;
                            adapt.ignoreDataNode = true;
                        }
                    }
                }
                return adapt;
            };
        },
        handleMugParseFinish: function (mug) {
            this.__callOld();
            if (mug.__className === "ModelRepeat") {
                var path = mug.form.getAbsolutePath(mug),
                    values = _.object(_.map(mug.form.getSetValues(), function (value) {
                        return [value.event + " " + value.ref, value];
                    }));
                mug.p.dataSource = {};
                mug.p.dataSourceChanged = false;
                mug.p.setvalues = {};
                mug.p.originalPath = path;
                _.each(setvalueData, function (data) {
                    var value = values[data.event + " " + path + data.path + "/@" + data.key];
                    if (value) {
                        mug.p.setvalues[data.key] = value;
                        if (data.key === "ids") {
                            // get dataSource.idsQuery
                            value = value.value;
                            var match = value && value.match(joinIdsRegexp);
                            if (match) {
                                mug.p.dataSource.idsQuery = match[1];
                            } else {
                                mug.p.dataSource.idsQuery = value;
                            }
                        }
                    }
                });
                if (mug.p.dataSource.idsQuery) {
                    var match = mug.p.dataSource.idsQuery.match(instanceRegexp);
                    if (match) {
                        var instances = _.object(_.map(mug.form.instanceMetadata, function (meta) {
                                return [meta.attributes.id, meta.attributes.src];
                            }));
                        match = match[1];
                        mug.p.dataSource.instance = {id: match};
                        if (instances.hasOwnProperty(match) && instances[match]) {
                            mug.p.dataSource.instance.src = instances[match];
                        }
                    }
                }
            }
        },
        // test function to be used before commcare data plugin is available
        getDataSources: function (type) {
            var value;
            if (type === "case") {
                value = [];
            } else {
                value = this.__callOld();
            }
            return value;
        }
    });

    function prepareForWrite(mug) {
        var path = mug.form.getAbsolutePath(mug);
        if (!mug.p.dataSourceChanged && mug.p.originalPath === path) {
            return;
        }

        var setvalues = mug.p.setvalues,
            setvaluesById = _.groupBy(mug.form.getSetValues(), "_id"),
            instance = mug.p.dataSource.instance,
            query = mug.p.dataSource.idsQuery;

        mug.p.repeat_count = path + "/@count";
        if (instance.src) {
            var instanceId = mug.form.addInstanceIfNotExists(instance);
            if (instanceId !== instance.id) {
                query = query.replace(instanceRegexp, "instance('" + instanceId + "')");
            }
        }

        // add/update <setvalue> elements
        _.each(setvalueData, function (data) {
            var value = setvalues[data.key],
                setvalue = null;
            if (value) {
                setvalue = setvaluesById[value._id] || {};
            } else {
                value = {};
            }
            value.ref = path + data.path + "/@" + data.key;
            value.value = data.query.replace("{}", data.key === "ids" ? query : path);
            if (!value.event) {
                mug.form.addSetValue(data.event, value.ref, value.value);
            }
        });
    }
});
