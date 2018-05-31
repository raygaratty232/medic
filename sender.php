<?php
$tosend = "shkola-sila@yandex.ru"; //To:
$subject = "Заявка с главной"; //Subject:
$from_name = "Школа музыки Си-Ля"; //From:
$from_email = "email@email.com"; //From:
//crm
$user = array(
	'USER_LOGIN' => 'd.scheglov@gmail.com',
	'USER_HASH' => '105bf59fc458d297368bab2c7936af4a'
);
$subdomain = 'gurkonru';

////NO EDIT
if(!isset($_POST['act'])) {
	exit();
}





switch($_POST['act']) {
	case 'sender':
		if(empty($_POST['name']) || empty($_POST['phone'])) {
			exit();
		}
		$name = $_POST['name'];
		$phone = $_POST['phone'];
		$utm_source = $_POST['utm_source'];

		$msg  = "<p><strong>Заявка</strong></p>\r\n";
		$msg .= "<p><strong>Имя:</strong> ".$name."</p>\r\n";
		$msg .= "<p><strong>Телефон:</strong> ".$phone."</p>\r\n";
		$msg .= "<p><strong>utm_source</strong> ".$utm_source."</p>\r\n";

		$headers = "MIME-Version: 1.0\r\nContent-type: text/html; charset=utf-8\r\n";
		$headers .= "From: =?UTF-8?B?".base64_encode($from_name)."?= <".$from_email.">\r\n";

				
				
				
		$roistatData = array(
			'roistat' => isset($_COOKIE['roistat_visit']) ? $_COOKIE['roistat_visit'] : null,
			'key'     => 'MTQxODc6MjkwMzk6NTA5ZTkzMTgwNjRiNmE3NjU0NzRhMGNlYjllMjg3MjE=', // Замените SECRET_KEY на секретный ключ из пункта меню Настройки -> Интеграция со сделками в нижней части экрана и строчке Ключ для интеграций
			'title'   => 'Заявка с главной',
			'name'    => $name,
			//'email'   => 'client@email.com',
			'phone'   => $phone,
			'is_need_callback' => '0', // Для автоматического использования обратного звонка при отправке контакта и сделки нужно поменять 0 на 1
			'fields'  => array(
			// Массив дополнительных полей, если нужны, или просто пустой массив. Более подробно про работу доп. полей можно посмотреть в видео в начале статьи
			// Примеры использования:
				"price" => 0, // Поле бюджет в amoCRM
				"responsible_user_id" => 193031, // Ответственный по сделке
				//"1276733" => "Текст", // Заполнение доп. поля с ID 1276733
				//"status_id" => 123123, // Создавать лид с определенным статусом в определенной воронке. Указывать необходимо ID статуса.
			// Подробную информацию о наименовании полей и получить список доп. полей вы можете в документации amoCRM: https://developers.amocrm.ru/rest_api/#lead
			// Более подробную информацию по работе с дополнительными полями в amoCRM, вы можете получить у нашей службы поддержки
				"charset" => "UTF-8", // Сервер преобразует значения полей из указанной кодировки в UTF-8
				"tags" => "Вокал", // Название тегов через запятую
			),
		);
		  
		file_get_contents("https://cloud.roistat.com/api/proxy/1.0/leads/add?" . http_build_query($roistatData));
		//$tosend="maddocs@yandex.ru";
		if(mail($tosend, "=?UTF-8?B?".base64_encode($subject)."?=", $msg, $headers)) {
			echo json_encode(array('result' => 'ok', 'crm' => $jsonCrm));
		} else {
			echo json_encode(array('result' => 'fail'));
		}
	break;
	default: exit();
}
?>