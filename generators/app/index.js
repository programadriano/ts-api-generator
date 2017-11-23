'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {


  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the first-rate ' + chalk.red('generator-ts-api') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your project name:',
      default: this.appname
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.log(props.name);
    });
  }

  writing() {
    /* Config */

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'), {
        name: this.props.name
      }
    );

    this.fs.copy(
      this.templatePath('_tsconfig.json'),
      this.destinationPath('tsconfig.json')
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
    /* End ConfigAll */

    /* Folders */

    this.fs.copy(
      this.templatePath('_server/controllers/userController.ts'),
      this.destinationPath('server/controllers/userController.ts')
    );

    this.fs.copy(
      this.templatePath('_server/models/userSchema.ts'),
      this.destinationPath('server/models/userSchema.ts')
    );

    this.fs.copy(
      this.templatePath('_server/repositories/userRepository.ts'),
      this.destinationPath('server/repositories/userRepository.ts')
    );

    this.fs.copy(
      this.templatePath('_server/routes/userRoute.ts'),
      this.destinationPath('server/routes/userRoute.ts')
    );

    /* End Folders */

    this.fs.copy(
      this.templatePath('_server/app.ts'),
      this.destinationPath('server/app.ts')
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
