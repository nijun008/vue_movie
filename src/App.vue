<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html, body, div, span, object, iframe, p, blockquote, pre,
abbr, address, cite, code,
del, dfn, em, img, ins, kbd, q, samp,
small, strong, sub, sup, var,
b, i,dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section, summary,
time, mark, audio, video, a {
  box-sizing: border-box;
  margin:0;
  padding:0;
  border:0;
  outline:0;
  font-size:100%;
  vertical-align:baseline;
  background:transparent;
}
input{
  box-sizing: border-box;
}
h1,h2,h3,h4,h5,h6{
  margin: 0;
  font-weight: 600;
}
ul,ol,li {
  list-style-type: none
}
a {
  color: #3879d9;
  text-decoration: none;
  outline: 0
}
a:hover {
  text-decoration: none;
}
img{
  max-width: 100%;
}
body,html{
  font-family: 'Microsoft YaHei';
  font-size: 14px;
}
.fl{
  float: left;
}
.fr{
  float: right;
}
.clearfloat:after{
  display: block;
  content: "";
  height: 0;
  visibility: hidden;
  zoom: 1;
  clear: both;
}
</style>
