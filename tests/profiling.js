/*jshint multistr: true */
require([
    'chai',
    'jquery',
    'underscore',
    'tests/utils'
], function (
    chai,
    $,
    _,
    util
) {
    describe("Profiling tests", function () {
        beforeEach(function (done) {
            // start with empty form to reduce effect of previous tests
            util.init({
                core: {
                    onReady: function () {
                        done();
                    }
                }
            });
        });

        for (var i = 0; i < 6; i++) {
            it("should load large form " + i, function (done) {
                util.init({
                    core: {
                        form: LARGE_XFORM,
                        onReady: function () {
                            done();
                        }
                    }
                });
            });
        }
    });

var LARGE_XFORM = '' +
'<?xml version="1.0" encoding="UTF-8" ?>\
<h:html xmlns:h="http://www.w3.org/1999/xhtml" xmlns:orx="http://openrosa.org/jr/xforms" xmlns="http://www.w3.org/2002/xforms" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:jr="http://openrosa.org/javarosa" xmlns:vellum="http://commcarehq.org/xforms/vellum">\
	<h:head>\
		<h:title>Untitled Form</h:title>\
		<model>\
			<instance>\
				<data xmlns:jrm="http://dev.commcarehq.org/jr/xforms" xmlns="http://openrosa.org/formdesigner/526523F0-DA37-439C-B697-B620DB933526" uiVersion="1" version="1" name="Untitled Form">\
					<question1 key="jr preload key value">default data value</question1>\
					<question2 />\
					<question30 />\
					<question3 />\
                    <!-- arbitrary data attributes -->\
					<question6 foo="bar" />\
					<question13 />\
					<question14 />\
					<question15 />\
					<question16 />\
					<question17 />\
					<question18 />\
					<question19 />\
					<question21>\
						<question31 jr:template="" />\
					</question21>\
                    <question22 jr:template="">\
                        <question23>\
                            <question24 />\
                            <question25 />\
                            <question26 />\
                            <question27 />\
                            <question28 />\
                            <question7 />\
                        </question23>\
                    </question22>\
					<question20 />\
					<question32 />\
				</data>\
			</instance>\
			<instance src="jr://instance/casedb" id="casedb"></instance>\
			<bind nodeset="/data/question1" type="xsd:string" constraint="/data/question20 = 2" jr:constraintMsg="jr:itext(\'question1-constraintMsg\')" relevant="/data/question20" required="true()" jr:preload="jr preload" jr:preloadParams="jr preload param" />\
			<bind nodeset="/data/question2" />\
			<bind nodeset="/data/question30" />\
			<bind nodeset="/data/question3" />\
            <!-- arbitrary bind attributes -->\
			<bind nodeset="/data/question6" spam="eggs" />\
			<bind nodeset="/data/question13" type="xsd:int" />\
			<bind nodeset="/data/question14" type="xsd:string" />\
			<bind nodeset="/data/question15" type="xsd:double" />\
			<bind nodeset="/data/question16" type="xsd:long" />\
			<bind nodeset="/data/question17" type="xsd:date" />\
			<bind nodeset="/data/question18" type="xsd:time" />\
			<bind nodeset="/data/question19" type="xsd:dateTime" />\
			<bind nodeset="/data/question21" />\
			<bind nodeset="/data/question21/question31" required="true()" />\
			<bind nodeset="/data/question22" />\
			<bind nodeset="/data/question22/question23" />\
			<bind nodeset="/data/question22/question23/question24" type="binary" />\
			<bind nodeset="/data/question22/question23/question25" type="binary" />\
			<bind nodeset="/data/question22/question23/question26" type="binary" />\
			<bind nodeset="/data/question22/question23/question27" type="geopoint" />\
			<bind nodeset="/data/question22/question23/question28" type="xsd:string" />\
			<bind nodeset="/data/question22/question23/question7" type="intent" />\
			<bind nodeset="/data/question20" />\
			<bind nodeset="/data/question32" calculate="1 + 2" />\
            <!-- setvalues -->\
            <setvalue event="xforms-ready" ref="/data/question1" value="2" />\
			<itext>\
				<translation lang="en" default="">\
					<text id="question1-label">\
						<value>question1 en label</value>\
						<value form="image">jr://file/commcare/image/data/question1.png</value>\
						<value form="audio">jr://file/commcare/audio/data/question1.mp3</value>\
						<value form="video">jr://file/commcare/video/data/question1.3gp</value>\
						<value form="long">question1 en long</value>\
						<value form="short">question1 en short</value>\
						<value form="custom">question1 en custom</value>\
					</text>\
					<text id="question1-hint">\
						<value>question1 hint en</value>\
					</text>\
					<text id="question1-constraintMsg">\
						<value>question1 en validation</value>\
					</text>\
					<text id="question2-label">\
						<value>question2</value>\
					</text>\
					<text id="question30-label">\
						<value>question30</value>\
					</text>\
					<text id="question3-label">\
						<value>question3</value>\
					</text>\
					<text id="question3-item1-label">\
						<value>item1</value>\
						<value form="image">jr://file/commcare/image/data/question3-item1.png</value>\
						<value form="audio">jr://file/commcare/audio/data/question3-item1.mp3</value>\
						<value form="video">jr://file/commcare/video/data/question3-item1.3gp</value>\
						<value form="long">item1 long en</value>\
						<value form="short">item1 short en</value>\
						<value form="custom">item1 custom en</value>\
					</text>\
					<text id="question3-item2-label">\
						<value>item2</value>\
					</text>\
					<text id="question6-label">\
						<value>question6</value>\
					</text>\
					<text id="question6-item1-label">\
						<value>item1</value>\
					</text>\
					<text id="question6-item2-label">\
						<value>item2</value>\
					</text>\
					<text id="question13-label">\
						<value>question13</value>\
					</text>\
					<text id="question14-label">\
						<value>question14</value>\
					</text>\
					<text id="question15-label">\
						<value>question15</value>\
					</text>\
					<text id="question16-label">\
						<value>question16</value>\
					</text>\
					<text id="question17-label">\
						<value>question17</value>\
					</text>\
					<text id="question18-label">\
						<value>question18</value>\
					</text>\
					<text id="question19-label">\
						<value>question19</value>\
					</text>\
					<text id="question21-label">\
						<value>question21</value>\
					</text>\
					<text id="question21/question31-label">\
						<value>question31</value>\
					</text>\
					<text id="question22-label">\
						<value>question22</value>\
					</text>\
					<text id="question22/question23-label">\
						<value>question23</value>\
					</text>\
					<text id="question22/question23/question24-label">\
						<value>question24</value>\
					</text>\
					<text id="question22/question23/question25-label">\
						<value>question25</value>\
					</text>\
					<text id="question22/question23/question26-label">\
						<value>question26</value>\
					</text>\
					<text id="question22/question23/question27-label">\
						<value>question27</value>\
					</text>\
					<text id="question22/question23/question28-label">\
						<value>question28</value>\
					</text>\
                    <text id="question22/question23/question7-label">\
						<value>question7</value>\
					</text>\
				</translation>\
				<translation lang="hin">\
					<text id="question1-label">\
						<value>question1 hin label</value>\
						<value form="image">jr://file/commcare/image/data/question1.png</value>\
						<value form="audio">jr://file/commcare/audio/data/question1.mp3</value>\
						<value form="video">jr://file/commcare/video/data/question1.3gp</value>\
						<value form="long">question1 hin long</value>\
						<value form="short">question1 hin short</value>\
						<value form="custom">question1 hin custom</value>\
					</text>\
					<text id="question1-hint">\
						<value>question1 hin hint</value>\
					</text>\
					<text id="question1-constraintMsg">\
						<value>question1 hin validation</value>\
					</text>\
					<text id="question2-label">\
						<value>question2</value>\
					</text>\
					<text id="question30-label">\
						<value>question30</value>\
					</text>\
					<text id="question3-label">\
						<value>question3</value>\
					</text>\
					<text id="question3-item1-label">\
						<value>item1</value>\
						<value form="image">jr://file/commcare/image/data/question3-item1.png</value>\
						<value form="audio">jr://file/commcare/audio/data/question3-item1.mp3</value>\
						<value form="video">jr://file/commcare/video/data/question3-item1.3gp</value>\
						<value form="long">item1 long hin</value>\
						<value form="short">item1 short hin</value>\
						<value form="custom">item1 custom hin</value>\
					</text>\
					<text id="question3-item2-label">\
						<value>item2</value>\
					</text>\
					<text id="question6-label">\
						<value>question6</value>\
					</text>\
					<text id="question6-item1-label">\
						<value>item1</value>\
					</text>\
					<text id="question6-item2-label">\
						<value>item2</value>\
					</text>\
					<text id="question13-label">\
						<value>question13</value>\
					</text>\
					<text id="question14-label">\
						<value>question14</value>\
					</text>\
					<text id="question15-label">\
						<value>question15</value>\
					</text>\
					<text id="question16-label">\
						<value>question16</value>\
					</text>\
					<text id="question17-label">\
						<value>question17</value>\
					</text>\
					<text id="question18-label">\
						<value>question18</value>\
					</text>\
					<text id="question19-label">\
						<value>question19</value>\
					</text>\
					<text id="question21-label">\
						<value>question21</value>\
					</text>\
                    <text id="question21/question31-label">\
                        <value>question31</value>\
                    </text>\
					<text id="question22-label">\
						<value>question22</value>\
					</text>\
					<text id="question22/question23-label">\
						<value>question23</value>\
					</text>\
					<text id="question22/question23/question24-label">\
						<value>question24</value>\
					</text>\
					<text id="question22/question23/question25-label">\
						<value>question25</value>\
					</text>\
					<text id="question22/question23/question26-label">\
						<value>question26</value>\
					</text>\
					<text id="question22/question23/question27-label">\
						<value>question27</value>\
					</text>\
					<text id="question22/question23/question28-label">\
						<value>question28</value>\
					</text>\
                    <text id="question22/question23/question7-label">\
						<value>question7</value>\
					</text>\
				</translation>\
			</itext>\
		</model>\
        &lt;!-- Intents inserted by Vellum: --&gt;\
		<odkx:intent xmlns:odkx="http://opendatakit.org/xforms" id="question7" class="app_id">\
			<extra key="key1" ref="value1" />\
			<response key="key2" ref="value2" />\
		</odkx:intent>\
	</h:head>\
	<h:body>\
		<input ref="/data/question1">\
			<label ref="jr:itext(\'question1-label\')">non-itext label</label>\
			<hint ref="jr:itext(\'question1-hint\')">non-itext hint</hint>\
		</input>\
		<trigger ref="/data/question2" appearance="minimal">\
			<label ref="jr:itext(\'question2-label\')" />\
		</trigger>\
		<trigger ref="/data/question30">\
			<label ref="jr:itext(\'question30-label\')" />\
		</trigger>\
		<select1 ref="/data/question3">\
			<label ref="jr:itext(\'question3-label\')" />\
			<item>\
				<label ref="jr:itext(\'question3-item1-label\')" />\
				<value>item1</value>\
			</item>\
			<item>\
				<label ref="jr:itext(\'question3-item2-label\')" />\
				<value>item2</value>\
			</item>\
		</select1>\
        <!-- arbitrary control attributes -->\
		<select ref="/data/question6" foo="baz">\
			<label ref="jr:itext(\'question6-label\')" />\
			<item>\
				<label ref="jr:itext(\'question6-item1-label\')" />\
				<value>item1</value>\
			</item>\
			<item>\
				<label ref="jr:itext(\'question6-item2-label\')" />\
				<value>item2</value>\
			</item>\
		</select>\
		<input ref="/data/question13">\
			<label ref="jr:itext(\'question13-label\')" />\
		</input>\
		<input ref="/data/question14" appearance="numeric">\
			<label ref="jr:itext(\'question14-label\')" />\
		</input>\
		<input ref="/data/question15">\
			<label ref="jr:itext(\'question15-label\')" />\
		</input>\
		<input ref="/data/question16">\
			<label ref="jr:itext(\'question16-label\')" />\
		</input>\
		<input ref="/data/question17">\
			<label ref="jr:itext(\'question17-label\')" />\
		</input>\
		<input ref="/data/question18">\
			<label ref="jr:itext(\'question18-label\')" />\
		</input>\
		<input ref="/data/question19">\
			<label ref="jr:itext(\'question19-label\')" />\
		</input>\
		<group ref="/data/question21">\
			<label ref="jr:itext(\'question21-label\')" />\
			<group>\
				<label ref="jr:itext(\'question21/question31-label\')" />\
				<repeat jr:noAddRemove="true()"  nodeset="/data/question21/question31" jr:count="2" />\
			</group>\
		</group>\
        <group>\
            <label ref="jr:itext(\'question22-label\')" />\
            <repeat jr:noAddRemove="false()" nodeset="/data/question22">\
                <group ref="/data/question22/question23" appearance="field-list">\
                    <label ref="jr:itext(\'question22/question23-label\')" />\
                    <upload ref="/data/question22/question23/question24" mediatype="image/*">\
                        <label ref="jr:itext(\'question22/question23/question24-label\')" />\
                    </upload>\
                    <upload ref="/data/question22/question23/question25" mediatype="audio/*">\
                        <label ref="jr:itext(\'question22/question23/question25-label\')" />\
                    </upload>\
                    <upload ref="/data/question22/question23/question26" mediatype="video/*">\
                        <label ref="jr:itext(\'question22/question23/question26-label\')" />\
                    </upload>\
                    <input ref="/data/question22/question23/question27">\
                        <label ref="jr:itext(\'question22/question23/question27-label\')" />\
                    </input>\
                    <secret ref="/data/question22/question23/question28">\
                        <label ref="jr:itext(\'question22/question23/question28-label\')" />\
                    </secret>\
                    <input ref="/data/question22/question23/question7" appearance="intent:question7">\
                        <label ref="jr:itext(\'question22/question23/question7-label\')" />\
                    </input>\
                </group>\
            </repeat>\
        </group>\
        <unrecognized>\
            <raw control="xml" />\
        </unrecognized>\
	</h:body>\
</h:html>';

});
