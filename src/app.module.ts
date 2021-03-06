import { Algorithm } from 'jsonwebtoken';
import * as path from 'path';

import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AdminController } from './admin.controller';
import { PublishersController } from './publishers.controller';
import { ArticlesController } from './articles.controller';
import { ReadersController } from './readers.controller';
import { RegionsController } from './regions.controller';
import { AppController } from './app.controller';

import { PublishersApiController } from './publishers-api.controller';
import { ArticlesModule } from './modules/articles/articles.module';
import { PublishersModule } from './modules/publishers/publishers.module';
import { RegionsModule } from './modules/regions/regions.module';
import { ReadersModule } from './modules/readers/readers.module';
import { AdminsModule } from './modules/admins/admins.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.DB_URL,
      }),
    }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          algorithm: process.env.JWT_ALGORITHM as Algorithm,
        },
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve('uploads'),
      serveRoot: '/uploads',
    }),
    forwardRef(() => ArticlesModule),
    forwardRef(() => RegionsModule),
    forwardRef(() => ReadersModule),
    forwardRef(() => PublishersModule),
    forwardRef(() => AdminsModule),
  ],
  controllers: [
    AppController,
    AdminController,
    PublishersController,
    ArticlesController,
    ReadersController,
    RegionsController,
    PublishersApiController,
  ],
  providers: [],
})
export class AppModule {}
