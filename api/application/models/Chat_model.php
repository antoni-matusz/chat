<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Chat_model extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function getchat() {
        $query = $this->db->query("SELECT * FROM chat ORDER BY id ASC;");
        $query = $query->result();
        return $query;
    }

    public function sendmessage($nick, $message, $nick_color){
        $data = array(
            'nick' => $nick,
            'message' => $message,
            'nick_color' => $nick_color
        );

        $this->db->insert('chat', $data);    
    }

    
}
