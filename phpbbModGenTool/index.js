const { exec } = require('child_process');

exec(
    'rm -R ./generated/root',
    (error, stdout, stderr) => {
        console.log('DELETING GENERATED ROOT');

        if (error) {
            console.log(
                `error: ${error.message}`
            );
        }

        if (stderr) {
            console.log(`stderr: ${stderr}`);
        }

        console.log(`stdout: ${stdout}`);

        exec(
            'rm ./generated/install.xml',
            (error, stdout, stderr) => {
                console.log(
                    'DELETING GENERATED INSTALL.XML'
                );

                if (error) {
                    console.log(
                        `error: ${error.message}`
                    );
                }

                if (stderr) {
                    console.log(
                        `stderr: ${stderr}`
                    );
                }

                console.log(`stdout: ${stdout}`);

                exec(
                    'php ./gen/gen/modx_gen.php ./forum ./new_forum -r ./generated -m ./generated/install.xml',
                    (error, stdout, stderr) => {
                        console.log(
                            'GENERATING NEW MOD'
                        );

                        if (error) {
                            console.log(
                                `error: ${error.message}`
                            );
                        }

                        if (stderr) {
                            console.log(
                                `stderr: ${stderr}`
                            );
                        }

                        console.log(
                            `stdout: ${stdout}`
                        );
                    }
                );
            }
        );
    }
);
