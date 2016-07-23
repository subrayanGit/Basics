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
         <p class="text-center"> Please answer the following questions </p><br> <h4 id="res" class="text-center"> </h4>

       Q1. What is 1-1-1+2/10? <br>

            <input type="radio" value="-0.8" class="q1" name="Q1"> -0.8 <br>
            <input type="radio" value=" 0.1" class="q1" name="Q1">  0.1 <br>
            <input type="radio" value=" 0  " class="q1" name="Q1">  0 <br>
            <input type="radio" value="none" class="q1" name="Q1"> None of these <br> <br>

       Q2. If 4 * X = 210 then what is X? <br>

            <input type="radio" value="56.7" class="q2" name="Q2"> 56.7 <br>
            <input type="radio" value="40.8" class="q2" name="Q2"> 40.8  <br>
            <input type="radio" value="52.5" class="q2" name="Q2"> 52.5 <br>
            <input type="radio" value="none" class="q2" name="Q2"> None of these <br> <br>


       Q3. Is 0/0 equal to 0? <br>

            <input type="radio" value="true" class="q3" name="Q3"> True <br>
            <input type="radio" value="false_3"class="q3" name="Q3"> False<br>

 <br> <br> <button  class="get_results btn btn-primary"> Check my answers</button> 
       </div>
  <script>
    
     function check_empty(val) {

       if(typeof(val)  !== "undefined") 
         return val;
       else
         return false;
     }
  
        $(".get_results").click(function() {

                 var answer1 = check_empty($("input[name=Q1]:checked").val()); 
                 var answer2 = check_empty($("input[name=Q2]:checked").val()); 
                 var answer3 = check_empty($("input[name=Q3]:checked").val()); 

                if(!answer1 && !answer2 && !answer3) {

                   $("#res").html("You are failed. Your score is 0");

                } else {

                   var data = {answer1:answer1,answer2:answer2,answer3:answer3};
                   $.ajax({

                          url:'php/ajax_quiz_result.php',
                          method:'post',  
                          data:data,
                          success:function(data){
                            
                          $("#res").html("Your score is "+data);
                         },
                         error:function(data) { 
                              
                              alert('Error Occured. Try again later');
                         }
                   });

               }
         
        });
  </script>
   </body>
</html>
