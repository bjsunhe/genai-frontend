# genai-frontend

sudo apt update
sudo apt install nginx


sudo mkdir -p /var/www/palletizer

sudo chown -R $USER:$USER /var/www/palletizer

sudo chmod -R 755 /var/www/palletizer



sudo nano /etc/nginx/sites-available/palletizer


server {
        listen 8899;
        listen [::]:8899;

        root /var/www/palletizer;
        index index.html index.htm index.nginx-debian.html;

        server_name your_domain.com www.your_domain;

        location / {
                try_files $uri $uri/ =404;
        }
}

sudo ln -s /etc/nginx/sites-available/your_domain /etc/nginx/sites-enabled/

sudo systemctl restart nginx