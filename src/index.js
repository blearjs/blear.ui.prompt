/**
 * modern-confirm
 * @author ydr.me
 * @create 2016-04-22 20:03
 */



'use strict';

var UI = require('blear.ui');
var Dialog = require('blear.ui.dialog');
var object = require('blear.utils.object');
var selector = require('blear.core.selector');
var Template = require('blear.classes.template');

var template = require('./template.html', 'html');

var tpl = new Template(template);
var UI_CLASS = UI.UI_CLASS + '-prompt';
var defaults = {
    width: 300,
    sure: {
        text: '确定',
        type: 'primary'
    },
    cancel: {
        text: '取消',
        type: 'default'
    },
    // 确定按钮位置，0为左边，1为右边
    surePosition: 1,
    title: '确认',
    message: '',
    placeholder: '',
    value: '',
    addClass: '',
    inputType: 'input',
    rows: 3,
    maxLength: -1,
    autoClose: true
};

var Prompt = Dialog.extend({
    className: 'Prompt',
    constructor: function (options) {
        var the = this;

        options = object.assign(true, {}, defaults, options);
        var buttons = [options.cancel, options.sure];

        if (!options.surePosition) {
            buttons.reverse();
        }

        // init node
        var html = tpl.render({options: options});
        options.autoFocus = false;
        options.buttons = buttons;
        options.closeable = false;
        options.headable = true;
        options.template = html;
        Prompt.parent(the, options);
        the[_inputEl] = selector.query('.' + UI_CLASS + '-ipt', the.getContainerEl())[0];

        the.on('afterOpen', function () {
            the[_inputEl].focus();
            the[_inputEl].select();
        });

        // init event
        the.on('action', function (index) {
            index = options.surePosition ? index : Math.abs(1 - index);
            switch (index) {
                case 0:
                    the.emit('cancel');
                    the.close();
                    break;

                case 1:
                    the.emit('sure', the[_inputEl].value);

                    if (options.autoClose) {
                        the.close();
                    }

                    break;
            }
        });
    },

    /**
     * 设置输入框内容
     * @param [value]
     * @returns {Prompt}
     */
    setValue: function (value) {
        var the = this;
        the[_inputEl].value = value || '';
        return the;
    }
});
var _inputEl = Prompt.sole();

require('./style.css', 'css|style');
Prompt.defaults = defaults;
module.exports = Prompt;
