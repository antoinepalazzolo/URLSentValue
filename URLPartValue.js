var URLPartValue = function() {
	this.evaluate = function(context) {
		var url = this.req;
		var schema = "";
		var domain = "";
		var path = "";

		var re = /^([^:]*:\/\/)([^\/]*)([^\?]*)?/;
		var m = re.exec(url);
		if(m !== null) {
			schema = m[1];
			domain = m[2];
			if(typeof m[3] !== 'undefined') {
				path = m[3];
			}

		}

		if (this.part === "schema") {
			return schema;
		}
		else if (this.part === "domain") {
			return domain;
		}
		else if (this.part === "path") {
			return path;
		}
		else if (this.part === "schema_domain") {
			return schema + domain;
		}
		else if (this.part === "domain_path") {
			return domain + path;
		}
		else if (this.part === "schema_domain_path") {			
			return schema + domain + path;
		} else if (this.part === "full_url") {
			return url;
		} else if (this.part == "domain_without_port") {
			return domain.split(":")[0];
		} else {
			return "";
		}
	}
		


	this.text = function(context) {
		if(this.req) {
			return this.req.name;
		} else {
			return null;
		}
	}
}

URLPartValue.identifier = "io.alphacoders.URLPartValue";

URLPartValue.title = "URL Part Value";

URLPartValue.inputs = [
	InputField("req", "Source URL", "String"),
	InputField(
		"part",
		"Part of the URL",
		"Select", 
		{"choices": 
			{
				"schema" : "schema",
				"domain" : "domain",
				"domain_without_port" : "domain without port",
				"path" : "path",
				"schema_domain" : "schema and domain",
				"domain_path" : "domain and path",
				"schema_domain_path": "schema, domain and path",
				"full_url" : "full URL"
			}
		}
	)
]

registerDynamicValueClass(URLPartValue);