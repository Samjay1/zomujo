import { dataSource } from "../data-source";
const dataSourceHandler = () => {
    beforeAll(async () =>{
        try {
            await dataSource.initialize()
            console.log("Data Source initialized.")
        } catch (error) {
            console.error("Error during Data Source initialization:\n", error)
        }
    })
    
    afterAll(async () => {
        try {
            await dataSource.close(); // Close the data source connections
            console.log("Data Source closed.");
        } catch (error) {
            console.error("Error while closing Data Source:\n", error);
        }
    });
}

export default dataSourceHandler