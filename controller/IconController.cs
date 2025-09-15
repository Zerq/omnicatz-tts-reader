using Microsoft.AspNetCore.Mvc;

public class Icon
{
    public string? Vector { get; set; }
    public string? Icon16 { get; set; }
    public string? Icon32 { get; set; }
    public string? Icon48 { get; set; }
    public string? Icon64 { get; set; }
    public string? Icon128 { get; set; }
    public string? Icon256 { get; set; }
    public string? Alt { get; set; }


}

public class IconController : Controller
{
    [HttpGet(@"/icon/{key}")]
    public Icon GetIconFile(string key)
    {
        Random rng = new Random(DateTime.Now.Microsecond);
        var index = rng.Next(0, 5);
        List<Icon> icons = new List<Icon>{
            new Icon(){ Alt="beige3", Vector="beige3.svg" },
            new Icon(){ Alt="castle", Vector="castle.svg" },
            new Icon(){
                Alt="Cat",
                Icon256="Cat256.png",
                Icon128="Cat128.png",
                Icon64="Cat064.png",
                Icon48="Cat048.png",
                Icon32="Cat032.png",
                Icon16="Cat016.png"},
            new Icon(){ Alt="defaultCastle", Vector="defaultCastle.svg" },
            new Icon(){ Alt="NOACCESS", Vector="NOACCESS.svg" },
            new Icon(){ Alt="worbl_maybe", Vector="worbl_maybe.svg" }
        };

        return icons[index];
    }



}