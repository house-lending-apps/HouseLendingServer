#!/bin/bash
echo "Home directory is: $HOME"
echo "deploy.sh: directory = $PWD"
echo "TRAVIS_REPO_SLUG = $TRAVIS_REPO_SLUG"
echo "REPOSITORY_NAME = $(echo $TRAVIS_REPO_SLUG | gawk -F/ '{print $2}')"
shopt -s extglob

if [ $TRAVIS_PULL_REQUEST = false ]
then
    echo "current branch is =  $TRAVIS_BRANCH"
    if [ $TRAVIS_BRANCH = "develop" ]
    then
        echo "targetBranch = master"
        git config --global user.email $GIT_USER_EMAIL
        git config --global user.name $GIT_USER_NAME

        echo "Starting deployment ... "

        cd ..
        echo "Current directory = $PWD"
        git clone https://$USER_CRED@github.com/house-lending-apps/HouseLendingMain.git $targetBranch

        cd HouseLendingMain
        echo "Current directory = $PWD"

        cp -r ../$REPOSITORY_NAME/dist/. .
        echo "Pushing to $targetBranch"

        git add -f --all .
        git commit -a -m 'Deployed new version of House Lending Server'
        git push -f --set-upstream origin $targetBranch
    else
        echo 'No need to deploy.'
    fi

else
        echo 'No need to deploy.'
fi
