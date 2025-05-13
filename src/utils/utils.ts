const utils ={
    generateSlug:(title: string) =>{
        return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40)
      }
}

export default utils;