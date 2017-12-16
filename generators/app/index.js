'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay('Welcome to the first-rate ' + chalk.red('generator-ts-api') + ' generator!')
    );

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Your project name:',
        default: this.appname
      },
      {
        type: 'list',
        name: 'versonES',
        message: 'What is your EcmaScript version?',
        choices: ['es5', 'es6']
      },
      {
        type: 'list',
        name: 'chooseJWT',
        message: 'Would you like to use JWT?',
        choices: ['yes', 'no']
      }
      /* ,{
        type: "list",
        name: "chooseDB",
        message: "What is your DB?",
        choices: ["mongoDB", "postgre"]
      },
       */
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.log(props.name);
      this.log(props.versonES);
      this.log(props.chooseJWT);
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        name: this.props.name
      }
    );

    this.fs.copyTpl(
      this.templatePath('_tsconfig.json'),
      this.destinationPath('tsconfig.json'),
      {
        versonES: this.props.versonES
      }
    );

    /* End Config */

    /* Init ConfigAll */

    this.fs.copy(
      this.templatePath('_server/config/auth.ts'),
      this.destinationPath('server/config/auth.ts')
    );

    this.fs.copy(
      this.templatePath('_server/config/configs.ts'),
      this.destinationPath('server/config/configs.ts')
    );

    this.fs.copy(
      this.templatePath('_server/config/db.ts'),
      this.destinationPath('server/config/db.ts')
    );

    this.fs.copy(
      this.templatePath('_server/config/uploads.ts'),
      this.destinationPath('server/config/uploads.ts')
    );

    /* End ConfigAll */

    /* Folders */

    this.fs.copy(
      this.templatePath('_server/controllers/userController.ts'),
      this.destinationPath('server/controllers/userController.ts')
    );

    this.fs.copy(
      this.templatePath('_server/schemas/userSchema.ts'),
      this.destinationPath('server/schemas/userSchema.ts')
    );

    this.fs.copy(
      this.templatePath('_server/repositories/userRepository.ts'),
      this.destinationPath('server/repositories/userRepository.ts')
    );

    /* End Folders */

    this.fs.copyTpl(
      this.templatePath('_server/app.ts'),
      this.destinationPath('server/app.ts'),
      {
        chooseJWT: this.props.chooseJWT
      }
    );

    this.fs.copy(
      this.templatePath('_server/server.ts'),
      this.destinationPath('server/server.ts')
    );
  }

  install() {
    this.installDependencies();
  }
};
