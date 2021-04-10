 aws dynamodb query \
    --table-name Music \
    --index-name AlbumTitle-index \
    --key-condition-expression "AlbumTitle = :name" \
    --expression-attribute-values  '{":name":{"S":"Somewhat Famous"}}'



 aws dynamodb query \
    --endpoint http://localhost:8000 \
    --table-name windfarm \
    --index-name assets \
    --key-condition-expression "sk = :sk" \
    --expression-attribute-values  '{":sk":{"S":"type#sheep"}}'




 aws dynamodb query \
    --endpoint http://localhost:8000 \
    --table-name windfarm \
    --key-condition-expression "pk = :pk and sk = :sk" \
    --expression-attribute-values  '{":pk":{"S":"id#dolly"}, ":sk":{"S":"type#sheep"}}'