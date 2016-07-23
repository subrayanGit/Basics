<?php
     $answer1_correct = '-0.8';
     $answer2_correct = '52.5';
     $answer3_correct = 'false_3';
     $count = 0;
     extract($_POST);

     if($answer1_correct == $answer1) 
       $count = $count+1;  
     if($answer2_correct == $answer2)
       $count = $count+1;
     if($answer3_correct == $answer3)
       $count = $count+1;

    echo $count;
