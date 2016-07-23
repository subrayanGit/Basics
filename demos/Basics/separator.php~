<!DOCTYPE html>
<html lang="en">
   <head>
      <title>Separtor Example</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="../assets/css/bootstrap.min.css">
      <script src="../assets/js/jquery.min.js"></script>
      <script src="../assets/js/bootstrap.min.js"></script>
   </head>
   <body>
      <div class="container">
         <h2>Separate by a special character</h2>
         <div class="form-group">
            <label for="usr" value=",">Keyword *</label>
            <input type="text" class="form-control" id="kyw">
         </div>
         <div class="form-group">
            <label for="usr">Copy Paste your string *</label>
            <textarea class="form-control" id="string" placeholer="String"></textarea>  
         </div>
         <button class="btn btn-primary separate"> Separate String By Keyword</button> <br>
         <div id="output">
         </div>
      </div>
      <script>
         $(document).ready(function(){
         
              $('.separate').click(function() {
                  var keyword  = $("#kyw").val();
                  var separate = $("#string").val();
                 if(keyword != '' && separate != '') {
                  var result = separate.split(keyword);
                  var i=0; $("#output").html('');
                  for(i;i<result.length;i++) {
         
                     var str = result[i]; $("#output").append('<input type="text" value="'+str+'"><br>');
         
                  }                  
                 } else {
              
                     alert('Please fill the above filelds');
                 }
         console.log(separate+keyword);
         
             });
         });
      </script>
   </body>
</html>
