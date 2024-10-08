# Getting Started with React App

## .htaccess

```bash
  <IfModule mod_rewrite.c>
        RewriteEngine On
        RewriteBase /wp-dashboard/
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /wp-dashboard/index.html [L]
    </IfModule>
```

```bash
server {
  listen 80 default_server;
  server_name _;

  #react app & front-end files
  location / {
   root __path__;
   try_files $uri /index.html;
  }
}
```

```bash
sudo chmod +x /home
sudo chmod +x /home
sudo chmod +x /home/ubuntu/
sudo chmod +x /home/ubuntu/react
sudo chmod +x /home/ubuntu/omn-react-dashboard/
sudo chmod +x /home/ubuntu/omn-react-dashboard/_work
sudo chmod +x /home/ubuntu/omn-react-dashboard/_work/omn-dashboard/
sudo chmod +x /home/ubuntu/omn-react-dashboard/_work/omn-dashboard/omn-dashboard/
sudo chmod +x /home/ubuntu/omn-react-dashboard/_work/omn-dashboard/omn-dashboard/build
```
