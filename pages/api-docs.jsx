// pages/api-docs.jsx

import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export default function APIDocs() {
  return <SwaggerUI url="/swagger.json" />;
}