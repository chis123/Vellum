define([
    'underscore'
], function (
    _
) {
    /**
     * Get a function that returns the next row of tab-separated values
     * each time it is called. Returns null after last row is generated.
     */
    function makeRowParser(value) {
        var simpleLine = /(.*)(?:\n|\r\n|\r|\u2028|\u2029)/mg,
            simpleField = /(.*?)(?:\t|(\n|\r\n|\r|\u2028|\u2029|$))/g,
            quotedField = /^("(?:[^"]|"")*")(?:\t|(\n|\r\n|\r|\u2028|\u2029|$))/,
            escapedQuote = /""/g,
            valueLength = value.length,
            lastIndex = 0;

        function setLastIndex(value) {
            if (value <= lastIndex) {
                // Prevent infinite row generation if somehow the last
                // index does not increase. This should never happen.
                throw new Error("last index " + lastIndex + " -> " + value);
            }
            lastIndex = value;
        }

        function next() {
            if (lastIndex >= valueLength) {
                return null;
            }
            simpleLine.lastIndex = lastIndex;
            var line = simpleLine.exec(value);
            if (line && line[1].indexOf('"') === -1) {
                setLastIndex(simpleLine.lastIndex);
                return line[1].split("\t");
            }
            return parseRow();
        }

        function parseRow() {
            var cell, qcell, row = [];
            simpleField.lastIndex = lastIndex;
            do {
                cell = simpleField.exec(value);
                if (cell[1][0] === '"') {
                    // attempt to parse quoted cell
                    qcell = quotedField.exec(value.slice(lastIndex));
                    if (qcell && qcell[1]) {
                        cell = qcell;
                        cell[1] = cell[1].slice(1, -1).replace(escapedQuote, '"');
                        simpleField.lastIndex = lastIndex + cell[0].length;
                    }
                }
                row.push(cell[1]);
                setLastIndex(simpleField.lastIndex);
            } while (lastIndex < valueLength && _.isUndefined(cell[2]));
            return row;
        }

        return next;
    }

    function parseRows(value, limit) {
        var rows = [],
            next = makeRowParser(value),
            row = next();
        while (row) {
            rows.push(row);
            if (limit && rows.length >= limit) { break; }
            row = next();
        }
        return rows;
    }

    return {
        makeRowParser: makeRowParser,
        parseRows: parseRows
    };
});