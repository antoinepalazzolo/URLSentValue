var URLSentValue = function() {
	this.evaluate = function(context) {
		var exchange;
		if(this.req) {
			exchange = this.req.getLastExchange();
		} else {
			exchange = context.getCurrentRequest().getLastExchange();
		}
		var url = exchange.requestUrl;
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
		}
		else {
			return "";
		}
	}
		


	this.text = function(context) {
		if(this.req) {
			return this.req.name;
		} else {
			return "";
		}
	}
}

URLSentValue.identifier = "com.luckymarmot.URLSentValue";

URLSentValue.title = "URL Sent Value";

URLSentValue.inputs = [
	InputField("req", "Source Request", "Request"),
	InputField(
		"part",
		"Part of the URL",
		"Select", 
		{"choices": 
			{
				"schema" : "schema",
				"domain" : "domain",
				"path" : "path",
				"schema_domain" : "schema and domain",
				"domain_path" : "domain and path",
				"schema_domain_path": "schema, domain and path"
			}
		}
	)
]

registerDynamicValueClass(URLSentValue);