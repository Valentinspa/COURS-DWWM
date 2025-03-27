"use strict";
const kana = document.querySelector('#kana');
// Depuis ES2018 :
const regexKana1 = /^[\p{Script_Extensions=Hiragana}\p{Script_Extensions=Katakana}]+$/u;
// Avant ES2018 :
const regexKana2 = /^[ぁ-んァ-ン]+$/;
// Depuis ES2018 :
const regexKanji1 = /^[\p{Script_Extensions=Han}]+$/u;
// Avant ES2018 :
const regexKanji2 = /^[一-龯㐀-䶵]+$/;

// La syntaxe moderne peut varier sur d'autres langages comme PHP

kana.addEventListener("input", function()
{
    if(regexKana1.test(kana.value) || regexKana2.test(kana.value))
    {
        console.log("kana");
        return
    }
    else if(regexKanji1.test(kana.value) || regexKanji2.test(kana.value))
    {
        console.log("kanji");
        return
    }
    console.log("not Japanese");
});