<?php
	$iTime = (int)$_GET['iTime'];
	if($iTime === 0) {
		$data = array(
		array(
			'id' => 5,
			'url' => '../img/9.jpg',
			'title' => '[NEW]1元抽大奖！1元抽大奖1元抽大奖，1元抽大奖1元抽大奖1元抽大奖',
		),
		array(
			'id' => 6,
			'url' => '../img/10.jpg',
			'title' => '[NEW]2元抽大奖！2元抽大奖2元抽大奖，2元抽大奖2元抽大奖2元抽大奖',
		),
	);
	} else {
	$data = array(
		array(
			'id' => 7,
			'url' => '../img/11.jpg',
			'title' => '[NEW]3元抽大奖！3元抽大奖3元抽大奖，3元抽大奖3元抽大奖3元抽大奖',
		),
		array(
			'id' => 8,
			'url' => '../img/12.jpg',
			'title' => '[NEW]4元抽大奖！4元抽大奖4元抽大奖，4元抽大奖4元抽大奖4元抽大奖',
		),
	);
	}
	echo json_encode($data);