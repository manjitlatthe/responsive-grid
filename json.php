<?php 
	if($_POST)
	{
		$obj = new stdClass();
		
		$pageNo = $_POST['pageNo'];
		$pageSize = $_POST['pageSize'];
		$limit = ($pageNo*$pageSize);
		
		$obj->data = array();
		$obj->totalCount = 103;
		
		$l = ($obj->totalCount > $limit) ? $limit : $obj->totalCount;
		
		for($i = ($limit - $pageSize); $i < $l; $i++)
		{
			$o = array();
			$o["userId"] = $i;
			$o["userName"] = "ABC".($i+1);
			$o["address"] = "Pune";
			$o["mobileNo"] = "9960xxxxxx";
			$obj->data[] = $o;
		}

		echo json_encode($obj);
	}
?>