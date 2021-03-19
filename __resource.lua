resource_manifest_version "44febabe-d386-4d18-afbe-5e627f4af937"

author "ReVeR"

client_script "client/*.lua"

server_scripts {
    "server.lua",
    "@mysql-async/lib/MySQL.lua"
}

ui_page "html/index.html"

files {
    'html/index.html',
    'html/index.js',
    'html/index.css',
    'html/reset.css',

}

