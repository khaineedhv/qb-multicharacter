fx_version 'cerulean'
game 'gta5'

description 'QB-Multicharacter'
version '1.0.0'

shared_script 'config.lua'
client_script 'client/main.lua'
server_scripts  {
    '@oxmysql/lib/MySQL.lua',
    'server/main.lua'
}

ui_page 'html/index.html'

files {
    'html/*.html',
    'html/*.css',
    'html/*.js',
    'html/img/*.png',
    'html/font/*.TTF'
}

dependencies {
    'qb-core',
    'qb-spawn'
}

lua54 'yes'
