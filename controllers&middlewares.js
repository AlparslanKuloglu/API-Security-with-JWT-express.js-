exports.login =(req, res) => {

     
        const email = req.body.email;
        const password = crypto.createHash('md5').update(req.body.password).digest("hex");
        const potentialUser = {
            where: {
                email: email,
                password: password
            },
            attributes: ['memail', 'muuid', 'cid']
        };
        Member.findOne(potentialUser)
        .then(user => {
            if(!user) {
                return res.status(404).send({
                     message: 'fail',
                     error: 'User not found. Authentication failed.'
                 });
            }
            const token = jwt.sign({
                id: user.id,
                email: user.email,
            }, 
            'secret_key',
            {
                expiresIn :"2h"
            }
            )
            return res.status(200).send({ message: 'success', token: token});

        })
        .catch((error) => res.status(400).send(error));
    }


    exports.middleWare = (req, res, next) => {
        try {
            //JWT req.header ile gönderildi.
            const token = req.headers.authorization.split(" ")[1];
            const decodedToken = jwt.verify(token, 'secret_key');
            req.userData = decodedToken;
            next();
        }catch(error) {
            return res.status(401).send({
                message: 'Auth failed'
            });
        }
    }



