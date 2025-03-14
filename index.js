require('dotenv').config();
const {DynamoDBClient,ListTablesCommand, PutItemCommand}=require("@aws-sdk/client-dynamodb");

const client=new DynamoDBClient({
    region:'us-east-1',
    credentials:{
        accessKeyId:process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
    }
});

async function main(){
    const listTablesCommand=new ListTablesCommand();
    const res=await client.send(listTablesCommand);
    console.log({tables:res.TableNames});

    const putItemCommand=new PutItemCommand({
        TableName:'youtube-demo',
        Item:{
            serial_no:{
                "S":"0001"
            },
            name:{
                "S":"ajdd"
            }
        }
    });
    await client.send(putItemCommand);

     const getItemCommand=new GetItemCommand({
        TableName:"youtube-demo",
        Key:{
            "serial_no":{
                "S":"0001"
            }
        }
    });
    const responce=await client.send(getItemCommand);
        console.log({
            items:responce.Item
        })

}
main();
