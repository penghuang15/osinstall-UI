import Ember from 'ember';

export default Ember.Route.extend({
	deviceSrv: Ember.inject.service('api/device/service'),
	model: function(params) {
        return Ember.RSVP.hash({id:params.id,
			info:this.get('deviceSrv').getScanByDeviceId(params.id).then(function(data){return data.Content;}),
		});
    },

    setupController: function(controller, model) {
    	var row = model.info;
        
    	if(!Ember.isEmpty(row.Cpu)){
        	row.CpuFormat = $.parseJSON(row.Cpu);  
        }

        if(!Ember.isEmpty(row.Memory)){
        	row.MemoryFormat = $.parseJSON(row.Memory);
        }

        if(!Ember.isEmpty(row.Disk)){
        	row.DiskFormat = $.parseJSON(row.Disk);
        }

        if(!Ember.isEmpty(row.Nic)){
       		row.NicFormat = $.parseJSON(row.Nic);
        }

        if(!Ember.isEmpty(row.Motherboard)){
       		row.MotherboardFormat = $.parseJSON(row.Motherboard);
        }
    	controller.set("item",row);
    }
});
