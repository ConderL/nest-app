import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface ModuleOptions {
  aaa: number;
  bbb: string;
}

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} =
  //   new ConfigurableModuleBuilder<ModuleOptions>()
  //     .setClassMethodName('forRoot')
  //     .build();
  new ConfigurableModuleBuilder<ModuleOptions>()
    .setClassMethodName('register')
    .setExtras({ isGlobal: true }, (definition, extras) => ({
      ...definition,
      global: extras.isGlobal,
    }))
    .build();
