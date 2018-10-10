<template>
  <div id="hello">
     <div>
       <span>关于我们</span>
     </div>
     <div>
       <span>苏ICP备15025316号</span>
     </div>
  </div>
</template>

<script>
export default {
  // name: 'HelloWorld',
  data () {
    return {
       
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body{
  position: relative;
}
#hello{
  position: absolute;
  left: 0;
  width: 100%;
  text-align: center;
  background: #303133;
  padding: 4px 0px;
  font-size: 12px;
}
#hello div{
  padding-bottom: 2px;
}
#hello span{
  color: #fff;
}
  
  
</style>
