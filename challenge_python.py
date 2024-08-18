"""
Refactor the next function using yield to return the array of objects found by the
`s3.list_objects_v2` function that matches the given prefix.
"""
def get_s3_objects(bucket, prefix=''):
    s3 = boto3.client('s3')

    kwargs = {'Bucket': bucket}
    next_token = None
    if prefix:
        kwargs['Prefix'] = prefix
    object_list = []
    while True:
        if next_token:
            kwargs['ContinuationToken'] = next_token
        resp = s3.list_objects_v2(**kwargs)
        contents = resp.get('Contents', [])
        for obj in contents:
            key = obj['Key']
            if key.startswith(prefix):
                yield obj
        next_token = resp.get('NextContinuationToken', None)

        if not next_token:
            break

"""
Please, full explain this function: document iterations, conditionals, and the
function as a whole
"""
def update_plan_items(main_plan, current_items, products=[]):
    """
    Updates a list of plan items based on a main plan, items_to_update, and products quantities.

    This function processes the `current_items`, ensuring the `main_plan` is included,
    adjusting quantities based on `products`, removing unnecessary or deleted items,
    and potentially adding new items from products.

    *Note* I renamed function and variables to also make the code more self-explanatory
    """
    updated_plan_items = []
    main_plan_present = False
    #cd = False # deleted this line as this variable had no purpose

    product_quantities = {}

    for extension in products:
        #prepopulate all product quantities in a dict
        product_quantities[extension['price'].id] = extension['qty']

    for item in current_items['items'].data:
        product = {
            'id': item.id
        }

        if item.price.id != main_plan.id and item.price.id not in product_quantities:
            #the product is no longer found in quantities, therefore we mak as deleted
            #we do this to all missing products except the main one.
            product['deleted'] = True
            #cd = True # deleted line, had no use
        elif item.price.id in product_quantities:
            # item is found in updates, updating new quantity
            # if quantity is not greater than zero, we mark as deleted as well.
            # there is no need to add into quantities, as having zero is considered deleted
            qty = product_quantities[item.price.id]
            if qty < 1:
                product['deleted'] = True
            else:
                product['qty'] = qty
            del product_quantities[item.price.id]
        elif item.price.id == main_plan.id:
            # if main plan had no updates, we use this flag to mark the qty as 1 for main plan
            main_plan_present = True


        updated_plan_items.append(product)
    
    if not main_plan_present:
        # in case the main plan item was not in the current items, we mark its quantity as 1
        updated_plan_items.append({
            'id': main_plan.id,
            'qty': 1
        })
    
    for price, qty in product_quantities.items():
        if qty < 1:
            continue
        # populating updated items quantities list
        # this may include the main plan item it if was found on the updates.
        updated_plan_items.append({
            'id': price,
            'qty': qty
        })
    
    return updated_plan_items


"""
Having the class `Caller` and the function `fn`
Refactor the function `fn` to execute any method from `Caller` using the argument `fn_to_call`
reducing the `fn` function to only one line.
"""
class Caller:
    add = lambda a, b : a + b
    concat = lambda a, b : f'{a},{b}'
    divide = lambda a, b : a / b
    multiply = lambda a, b : a * b

def fn(fn_to_call, *args):
    return getattr(Caller, fn_to_call)(*args)


"""
A video transcoder was implemented with different presets to process different videos in the application. The videos should be
encoded with a given configuration done by this function. Can you explain what this function is detecting from the params
and returning based in its conditionals?
"""
def fn(config, w, h):
    """
    This function gets all videos from config for the same aspect ratio category (portrait, landscape or standard)
    of the dimensions provided (w,h)
    which have a width smaller or equal to the provided (w)
    :param config:
    :param w:
    :param h:
    :return:
    """
    # maybe 'videos_matching' would be a better naming
    v = None

    # aspect_ratio would be a better naming
    ar = w / h

    if ar < 1:
        # is vertical
        # p might refer to "portrait" videos from config
        v = [r for r in config['p'] if r['width'] <= w]
    elif ar > 4 / 3:
        # is horizontal, particularly wide
        # l might refer to landscape videos from config
        v = [r for r in config['l'] if r['width'] <= w]
    else:
        # horizontal, almost squared
        # s might refer to standard videos from config
        v = [r for r in config['s'] if r['width'] <= w]
    return v

"""
Having the next helper, please implement a refactor to perform the API call using one method instead of rewriting the code
in the other methods.
"""
import requests
class Helper:
    DOMAIN = 'http://example.com'
    SEARCH_IMAGES_ENDPOINT = 'search/images'
    GET_IMAGE_ENDPOINT = 'image'
    DOWNLOAD_IMAGE_ENDPOINT = 'downloads/images'

    AUTHORIZATION_TOKEN = {
        'access_token': None,
        'token_type': None,
        'expires_in': 0,
        'refresh_token': None
    }

    def _make_api_call(self, endpoint, method='get', params=None, data=None):
        token_type = self.AUTHORIZATION_TOKEN['token_type']
        access_token = self.AUTHORIZATION_TOKEN['access_token']

        headers = {
            'Authorization': f'{token_type} {access_token}',
        }
        url = f'{self.DOMAIN}/{endpoint}'

        if method not in ['get', 'post']:
            raise 'Method not allowed'

        request_func = getattr(requests, method)  # Get the appropriate request function (get or post)
        response = request_func(url, headers=headers, params=params, data=data)
        return response


    def search_images(self, **kwargs):
        return self._make_api_call(self.SEARCH_IMAGES_ENDPOINT, params=kwargs)
        
    def get_image(self, image_id, **kwargs):
        return self._make_api_call(f'{self.GET_IMAGE_ENDPOINT}/{image_id}', params=kwargs)

    def download_image(self, image_id, **kwargs):
        return self._make_api_call(f'{self.DOWNLOAD_IMAGE_ENDPOINT}/{image_id}', method='post', data=kwargs)
