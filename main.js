(function( $ ) {
	
	// Checking given parameter is function or object
	function isObject(val) {
	    if (val === null) { return false;}
	    return ( (typeof val === 'function') || (typeof val === 'object') );
	}
	
	// Defination of basegrid
	$.fn.basegrid = function(obj, param1, param2)
	{
		var me = this;
		this.selectedRowIds = [];
		this.data = new Object();
		
		this.ajaxUrl = obj.ajaxUrl;
		//this.method = obj.method;
		this.primaryKey = obj.primaryKey;
		this.columns = obj.columns;
		this.multiSelect = obj.multiSelect;
		this.pagination = obj.pagination;

		// Visialize grid contents
		this.loadGrid = function(pageNo, pageSize){
			var html = '';
			if(this.columns.length)
			{
				html = '<table class="table table-responsive tbl-base"><thead>';
				html += '<tr>';
				for(var i = 0; i < this.columns.length; i++)
				{
					if(!this.columns[i].hidden)
						html += '<th>'+this.columns[i].displayName+'</th>';
				}
				html += '</tr>';
				html += '</thead>';
			}
			
			// Get data from server 
			$.post(this.ajaxUrl, {
				pageNo: pageNo,
				pageSize: pageSize
			}).done(function(data){
				data = jQuery.parseJSON(data);
				me.data = data.data;
				var object = data;
				var rows = object.data;
				//console.log(data);
				var totalCount = object.totalCount;
				html += '<tbody>';
				if(rows.length)
				{
					for(var j = 0; j < rows.length; j++)
					{
						var clsSelectedRow = '';
//						if(me.selectedRowIds.length)
//						{
//							for(var i = 0; i < me.selectedRowIds.length; i++)
//							{
//								if(me.selectedRowIds[i] == rows[j][me.primaryKey])
//									clsSelectedRow = ' class="selected-row"';
//							}
//						}
						//
						html += '<tr data-id="'+ rows[j][me.primaryKey] + '"' + clsSelectedRow + '>'; 
						for(var i = 0; i < me.columns.length; i++)
						{
							if(!me.columns[i].hidden)
							{
								var f = me.columns[i].field;
								//console.log(rows[j]);
								html += '<td>' + rows[j][f] + '</td>';
							}
						}
						html += '</tr>';
					}
				}
				html += '</tbody></table>';
				
				// Add pagination
				var paginationHTML = '';
				if(rows.length)
				{
					var pageCount = ((totalCount/pageSize));
					
					if(pageCount > 0)
					{
						paginationHTML += '<nav><ul class="pagination">';
						if(pageCount > me.pagination.pageLimit)
						{
							paginationHTML += '<li class="disabled"><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span><span class="sr-only">Previous</span></a></li>';
						}
						var cls = '';
						for(var i = 0; i < pageCount; i++)
						{
							cls = (pageNo == (i+1)) ? 'class="active"' : '';
							paginationHTML += '<li '+ cls +'><a href="#" id="pg-'+ (i+1) +'">'+ (i+1) +'</a></li>';
						}
						
						if(pageCount > me.pagination.pageLimit)
						{
							paginationHTML += '<li><a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span><span class="sr-only">Next</span></a></li>';
						}
						
						paginationHTML += '</ul></nav>';
					}
				}
				//
				me.html(html + paginationHTML);
				//console.log(data);
			});
		};
		
		// Initialize grid
		var pageSize = me.pagination.pageSize;
		this.loadGrid(1, pageSize);
		
		// Row selection
		$(this).on("click", "td", function() {
			
			if($(this).parent('tr').hasClass("selected-row"))
			{
				$(this).parent('tr').removeClass("selected-row");
				var index = me.selectedRowIds.indexOf($(this).parent('tr').attr('data-id'));
				if(index > -1)
					me.selectedRowIds.splice(index, 1);
			}
			else {
				if(!me.multiSelect)
				{					
					me.selectedRowIds = [];
					$(me).find('tr').removeClass();
				}
				me.selectedRowIds.push($(this).parent('tr').attr('data-id'));
				$(this).parent('tr').addClass("selected-row");
			}
		});
		
		// Page no. selection
		$(this).on("click", ".pagination a", function(e) {
			e.preventDefault();
			//alert($(this).attr('id'));
			var id = "#" + $(this).attr('id');
			var pg_no = $(id).html();
			//alert(pg_no);
			me.selectedRowIds = [];
			me.loadGrid(pg_no, pageSize);
		});
		
		// methods
		$.fn.basegrid.getSelectedRowIds = function()
		{
			return me.selectedRowIds;
		};
		
		$.fn.basegrid.getSelectedRowCount = function()
		{
			return me.selectedRowIds.length;
		};
		
		$.fn.basegrid.getSelectedRows = function()
		{
			var arr = [];
			for(var i = 0; i < me.data.length; i++)
			{
				for(var j = 0; j < me.selectedRowIds.length; j++)
				{
					if(me.data[i][me.primaryKey] == me.selectedRowIds[j])
						arr.push(me.data[i]);
				}
			}
			return arr;
		};
		
		return this;
	};
}( jQuery ));