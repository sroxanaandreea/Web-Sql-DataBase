var db = openDatabase("itemDB","1.0","itemDB", 65535);
$(function(){
    $("#create").click(function(){
        db.transactions(function(transactions){
            var sql="CREATE TABLE items "+
            "(id INTEGER NOT NULL PRImARY KEY AUTOINCREMENT,"+
            "item VARCHAR(100) NOT NULL,"+
            "quantity INT(5) NOT NULL)";
            transactions.executeSql(sql, undefined, function(){
                alert("Data is created successfully");
            }, function(){
                alert("Table is already created")";"
            })
        })
    });
});