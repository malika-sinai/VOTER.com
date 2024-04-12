<?php
session_start();
session_destroy();
header("Location: Acceuil.php");
exit;

?>