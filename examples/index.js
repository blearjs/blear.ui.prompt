/**
 * 文件描述
 * @author ydr.me
 * @create 2017-04-27 11:28
 * @update 2017-04-27 11:28
 */


'use strict';

var Prompt = require('../src/index');

var prompt = new Prompt({
    title: '演示一下',
    message: '请输入你的姓名',
    placeholder: '姓名'
});

document.getElementById('btn').onclick = function () {
    prompt.open();
};



