#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Simple HTTP server with proper UTF-8 encoding for HTML files
"""
import http.server
import socketserver
import mimetypes

class UTF8HTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add UTF-8 encoding header for HTML and JS files
        if self.path.endswith('.html') or self.path.endswith('.htm'):
            self.send_header('Content-Type', 'text/html; charset=utf-8')
        elif self.path.endswith('.js'):
            self.send_header('Content-Type', 'application/javascript; charset=utf-8')
        elif self.path.endswith('.css'):
            self.send_header('Content-Type', 'text/css; charset=utf-8')
        super().end_headers()

PORT = 8080

print(f"Servidor iniciado en http://localhost:{PORT}")
print("Presiona Ctrl+C para detener")

with socketserver.TCPServer(("", PORT), UTF8HTTPRequestHandler) as httpd:
    httpd.serve_forever()