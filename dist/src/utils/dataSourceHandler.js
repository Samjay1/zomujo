"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const dataSourceHandler = () => {
    beforeAll(async () => {
        try {
            await data_source_1.dataSource.initialize();
            console.log("Data Source initialized.");
        }
        catch (error) {
            console.error("Error during Data Source initialization:\n", error);
        }
    });
    afterAll(async () => {
        try {
            await data_source_1.dataSource.close(); // Close the data source connections
            console.log("Data Source closed.");
        }
        catch (error) {
            console.error("Error while closing Data Source:\n", error);
        }
    });
};
exports.default = dataSourceHandler;
//# sourceMappingURL=dataSourceHandler.js.map