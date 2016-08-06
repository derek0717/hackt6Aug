#API http://zuyin.tech/


[POST] http://zuyin.tech/addPin
```json
{
"_id" :  "57a648c4c439a7413277a9ae",
"title" : "MyFirstPinTEST" ,
"message" : "YAY GO" ,
"userId" : 1 ,
"tags" : [ "A" , "B"] ,
"location" : { "lat" : 1.5453 , "lon" : 2.345} ,
}
```

[GET] http://zuyin.tech/addPins
```json
[
{
"_id" :  "57a648c4c439a7413277a9ae",
"title" : "MyFirstPinTEST" ,
"message" : "YAY GO" ,
"userId" : 1 ,
"likes" : 40 ,
"dislikes" : 5 ,
"tags" : [ "A" , "B"] ,
"location" : { "lat" : 1.5453 , "lon" : 2.345} ,
},
{ ... },
{ ... }
]
```

[POST] zuyin.tech:80/api/likePin
```json
{"pinId": "57a648c4c439a7413277a9ae"}
```

[POST] zuyin.tech:80/api/dislikePin
```json
{"pinId": "57a648c4c439a7413277a9ae"}
```

[POST] zuyin.tech:80/api/getPinsByTag
```json
{"tag":"Dance"}
```

[POST] zuyin.tech:80/api/getPinsByLocation
```json
{"location": {"lat":50.3423, "lon":43.564}, "radius":500}
```
