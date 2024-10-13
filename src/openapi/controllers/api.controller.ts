import * as yaml from 'yaml';
import { Controller, Get, Header, HttpCode, Logger } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import HttpStatusCode from '@/utils/net/http';
import { createLogger } from '@/utils/common';
import { ApiService } from '@/openapi/services/api.service';
import { ScalarOptions } from '@/openapi/schemas/ScalarOptions';
import { Testing } from '@/decorators/testing.decorator';

@Controller()
export class ApiController {
  private readonly logger: Logger;
  private readonly apiService: ApiService;

  constructor(apiService: ApiService) {
    this.logger = createLogger(this);
    this.apiService = apiService;
  }

  @Testing()
  @Get('/api/v1/openapi.json')
  @HttpCode(HttpStatusCode.OK)
  @Header('Content-Type', 'application/json')
  @ApiResponse({
    description: 'Get Open API Reference JSON',
    type: String,
  })
  async getOpenApiJSON(): Promise<string> {
    // mock up OpenAPI JSON
    // show path of OpenAPI JSON itself
    const data = {
      openapi: '3.0.0',
    };

    return JSON.stringify(data);
  }

  @Testing()
  @Get('/api/v1/openapi.yaml')
  @HttpCode(HttpStatusCode.OK)
  @Header('Content-Type', 'text/yaml')
  @ApiResponse({
    description: 'Get Open API Reference YAML',
    type: String,
  })
  async getOpenApiYAML(): Promise<string> {
    // mock up OpenAPI YAML
    // show path of OpenAPI YAML itself
    const data = {
      openapi: '3.0.0',
    };

    return yaml.stringify(data);
  }

  @Testing()
  @Get('/api/scalar')
  @HttpCode(HttpStatusCode.OK)
  @Header('Content-Type', 'text/html')
  @ApiResponse({
    description: 'Get Scalar API Reference',
    type: String,
  })
  async getScalarHTML(): Promise<string> {
    const path = '/api/v1/openapi.yaml';
    const options = new ScalarOptions('Scalar API Reference', 'purple', true);
    return this.apiService.renderHTML(path, options);
  }
}
