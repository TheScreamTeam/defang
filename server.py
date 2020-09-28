import http.server
import ssl
import sys
import os

usage = 'python3 server.py contentDir certificatePath'

'''parse args'''
try:
	if '-h' in sys.argv or '--help' in sys.argv:
		exit(usage)
	certPath = os.path.abspath(sys.argv[2]) # resolve certPath
	os.chdir(sys.argv[1]) # change to content directory
except IndexError:
	exit(usage)

handler = http.server.SimpleHTTPRequestHandler
handler.extensions_map = {
    '.manifest': 'text/cache-manifest',
	'.html': 'text/html',
    '.png': 'image/png',
	'.jpg': 'image/jpg',
	'.svg':	'image/svg+xml',
	'.css':	'text/css',
	'.js':	'text/javascript',
    '.module.js': 'module',
	'': 'application/octet-stream',
}
httpd = http.server.HTTPServer(('localhost', 3000), handler)
httpd.socket = ssl.wrap_socket (httpd.socket, certfile=certPath, server_side=True)
httpd.serve_forever()