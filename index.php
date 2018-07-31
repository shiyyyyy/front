<?php

function replace_meta($user,$txt)
{
    $txt = str_replace('%TITLE%',$user['title'],$txt);
    $txt = str_replace('%DESC%',$user['desc'],$txt);
    $txt = str_replace('%COPY%',$user['copy'],$txt);

    return $txt;
}

$user = ['title'=>'旅游ERP系统','desc'=>'旅游ERP系统',
        'login'=>'pub/login.html','passport'=>'pub/passport.html',
        'index'=>'pub/index.html','copy'=>'同业聚'];
if(file_exists('user.json')){
    $str = file_get_contents('user.json');
    $user = array_merge($user,json_decode($str,true));
}

//login
if(isset($_GET['login'])){
    $txt = file_get_contents($user['login']);
    echo replace_meta($user,$txt);
    return;
}
//scanner
if(isset($_GET['passport'])){
    $txt = file_get_contents($user['passport']);
    echo replace_meta($user,$txt);
    return;
}


//home
if(file_exists('dev')){
    $txt = file_get_contents($user['index']);
    $txt = str_replace('%dc%',time(),$txt);

}else{
    $index_cache = 'index.cache';
    if(!empty($_GET['update']) || !file_exists($index_cache)){
        $txt = file_get_contents($user['index']);
        $c = preg_replace_callback('/([^\'"]+)\?_=(%dc%)/', function($m){
                return $m[1].'?_='.@md5(file_get_contents($m[1]));
            }, $txt);
        file_put_contents($index_cache, $c);
    }
    $txt = file_get_contents($index_cache);
}

echo replace_meta($user,$txt);
