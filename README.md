# responsive-grid
Don't be forced into having a fixed number of columns across a whole page. You can have whatever you want, wherever you need it. It plugs into your existing HTML and CSS, it will be your friend in no time.

Edit following code in index.html and go on.

	$('#mygrid').basegrid({
		primaryKey: 'userId',
		ajaxUrl: 'json.php',
		multiSelect: true,
		//method: 'POST',
		columns: [
			{ field: 'userId', displayName: 'userId', hidden: true },
			{ field: 'userName', displayName: 'Name' },
			{ field: 'address', displayName: 'Address' },
			{ field: 'mobileNo', displayName: 'Mobile No' }
		],
		pagination:{
			pageSize: 15,
			pageLimit: 5
		}
	});
