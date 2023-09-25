local_server="/infraestructure/local_env/esp32_server"
server_path=$(pwd)$local_server

npm start --prefix $server_path
