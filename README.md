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
