

(function($){
  var ListView = Backbone.View.extend({
    el: $('#jobs_contact_form'), 
	//el:$('body'),
    events: {
	  'click button#contact_submit': 'addToLog'
    },
    initialize: function(){
      _.bindAll(this, 'render', 'addToLog'); 

      this.counter = 0;
      this.render();
    },
    render: function(){
		$(this.el).append("<div class='form-group'><label>Name</label><input type='text' class='form-control' id='contact_name' placeholder='Name'></div><div class='form-group'><label>Email</label><input type='text' class='form-control' id='contact_email' placeholder='Enter Email'></div><label>Content</label><textarea class='form-control' rows='6' id='contact_content'></textarea><br/><div  class='col-sm-offset-10 col-sm-2 pull-right'><button type='submit' id='contact_submit' class='btn btn-default'>&nbsp;&nbsp;&nbsp;Submit&nbsp;&nbsp;&nbsp;</button></div>");
    },
	addToLog: function(){
		$.ajax({
			url: '../php/service/contact_log.php',
			type:'POST',
			data: {
				name:$("#contact_name").val(),
				email:$("#contact_email").val(),
				content:$("#contact_content").val(),
			}				
		})
		.done(function(data){
		})
		.error(function(data){alert(data);});
	}
  });

  var listView = new ListView();
})(jQuery);
