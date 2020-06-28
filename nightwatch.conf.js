module.exports = {
    // An array of folders (excluding subfolders) where your tests are located;
    // if this is not specified, the test source must be passed as the second argument to the test runner.
    //src_folders: "",
    src_folders: ["tests"],
    output_folder: "./test_reports",

    webdriver: {
        start_process: true,
        //server_path: require('chromedriver').path,
        server_path: "node_modules/.bin/chromedriver",
        port: 9515,
        cli_args: [
            // '-vv'
        ]
    },

    test_settings: {
        default: {
            launch_url: 'http://localhost:3000',
            desiredCapabilities: {
                browserName: 'chrome',
                javascriptEnabled: true,
                chromeOptions: {
                    w3c: false
                }
            }
        }
    }
};