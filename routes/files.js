exports.sitemap = function(req, res){
  res.sendfile('sitemap.xml',  {root: './public'});
}

exports.robots = function(req, res){
  res.sendfile('robots.txt',  {root: './public'});
}

exports.application = function(req, res){
  res.sendfile('application.png',  {root: './public/files/docs/en'});
}

exports.contract = function(req, res){
  res.sendfile('contract.doc',  {root: './public/files/docs/en'});
}

exports.invoice = function(req, res){
  res.sendfile('invoice.jpg',  {root: './public/files/docs/en'});
}