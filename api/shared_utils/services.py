# Installed Utils
import httpx

class APIAsync:
    """
    I'm using this class for
    async REST requests
    """
    def __init__(self, base_url) -> None:
        self.base_url = base_url

    async def post(self, endpoint, data=None, json=None) -> str | None:
        url = f"{self.base_url}{endpoint}"
        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(url, data=data, json=json)
                response.raise_for_status()
                return response.json()
            except httpx.HTTPStatusError as http_err:
                print(f"HTTP error occurred: {http_err}")
            except httpx.RequestError as req_err:
                print(f"An error occurred: {req_err}")
        return None
    
class Imgur(APIAsync):
    """
    I'm using this class
    to upload images on imgur
    """
    def __init__(self, base_url) -> None:
        super().__init__("https://api.imgur.com/3/")

    def upload(self):
        """
        Uploads images on Imgur
        """
        