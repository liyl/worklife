昨天折腾了半天终于给安卓的app添加了一下ssl证书，先描述一下自己环境 cocos2d-js v3.10 + nginx 。割了吧。。这个不重要
==========================================================================================================

因为这几天使用js 。刚从c++忙完过来。体会信手拈来这个词真正的感觉。 好像这个也不重要  再割 ^^!!!!!!!

===========================================================================================================

正题开始。如果你想知道为什么需要个ssl证书。那来错了。如果你想知道步骤。那恭喜你。

/*****    先生成我们需要的一个key  ******/
1、openssl genrsa -out testCA.key 2048 

2、openssl req -x509 -new -nodes -key testCA.key -days 3650 -out testCA.pem
	这里需要注意了，你会看到以下输出

	You are about to be asked to enter information that will be incorporated
	into your certificate request.
	What you are about to enter is what is called a Distinguished Name or a DN.
	There are quite a few fields but you can leave some blank
	For some fields there will be a default value,
	If you enter '.', the field will be left blank.
	-----
	Country Name (2 letter code) [AU]:CN
	State or Province Name (full name) [Some-State]:省份
	Locality Name (eg, city) []:市区
	Organization Name (eg, company) [Internet Widgits Pty Ltd]:公司名称
	Organizational Unit Name (eg, section) []:公司属性（IT，Team 。。。随便）
	Common Name (e.g. server FQDN or YOUR name) []: ！！！！（这里要填服务器的地址 比如 www.testServer.com） ！！！！！！！！！！！！
	Email Address []: 不说了

3、创建csr 文件
	（1）、openssl genrsa -out testDevice.key 2048	
	（2）、openssl req -new -key testDevice.key -out testDevice.csr  （！！！ 这两个名字必须一样 ！！！）
		*
		*其他的跟上边一样就行  
		*
		*Common Name (e.g. server FQDN or YOUR name) []: ！！！！（这里要填服务器的地址 比如 www.testServer.com） ！！！！！！！！！！！！
		*
		*A challenge password []: （有密码和密码服务器的配置有些不一样）  我直接回车了
		*
		*
		*

4、生成crt文件
	openssl x509 -req -in testDevice.csr -CA testCA.pem -CAkey testCA.key -CAcreateserial -out testDevice.crt -days 3650

	将这个crt 文件和testDevice.key放到服务器上配置一下即可   eg：
	 server {
	    listen 4433;
	    ssl on;
	    ssl_certificate /etc/nginx/ssl/testDevice.crt;
	    ssl_certificate_key /etc/nginx/ssl/testDevice.key;
	    。。。。
		}
5、前端的使用pem文件
	eg ： cocos2d-js v3.10   

	std::string fullPath = cocos2d::FileUtils::getInstance()->fullPathForFilename("testCA.pem");
	cocos2d::network::HttpClient::getInstance()->setSSLVerification(fullPath);

	很粗糙的记录了一下整个过程。第一次玩ssl 方便以后学习  么么。。

