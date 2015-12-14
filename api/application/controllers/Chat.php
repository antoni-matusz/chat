<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Chat extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $post = file_get_contents('php://input');
        $_POST = json_decode($post, true);

        $this->load->model('Chat_model');

        function securityData($data) {
            $data = trim($data);
            $data = stripslashes($data);
            $data = htmlspecialchars($data);
            return $data;
        }
}


        public function getchat(){
            $output = $this->Chat_model->getchat();
            echo json_encode($output);
        }

        public function sendmessage(){
            $nick = securityData($this->input->post('nick'));
            $message = securityData($this->input->post('message'));
            $nick_color = securityData($this->input->post('nick_color'));

            $output = $this->Chat_model->sendmessage($nick, $message, $nick_color);
            if(!$output){
                echo json_encode('{error: "Błąd Api"}');    
            }
        }
}
